import React from 'react';
import { ChevronLeft, Bell, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { useAuthStore } from '@/stores/authStore';
import { isSupabaseAuthEnabled } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TopBarProps {
  title?: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
}

const isLocalImportEnabled =
  (import.meta.env.VITE_ENABLE_LOCAL_IMPORT as string | undefined) === 'true';

export const TopBar: React.FC<TopBarProps> = ({
  title,
  showBackButton = false,
  rightAction,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, accounts, currentAccountId, createAccount, switchAccount } = useAppStore();
  const {
    user: authUser,
    signOut,
    migrateLocalData,
    restoreFromLocalBackupToCloud,
    isMigratingLocalData,
    localMigrationDone,
    localMigrationMessage,
  } = useAuthStore();
  const [isAccountModalOpen, setIsAccountModalOpen] = React.useState(false);
  const [newAccountName, setNewAccountName] = React.useState('');
  const [importCurrentData, setImportCurrentData] = React.useState(true);

  const activeAccount = React.useMemo(
    () => accounts.find((account) => account.id === currentAccountId) || null,
    [accounts, currentAccountId]
  );

  const getPageTitle = () => {
    if (title) return title;
    
    const path = location.pathname;
    const titles: Record<string, string> = {
      '/santuario': 'Santuário',
      '/rituais': 'Rituais',
      '/ciclos': 'Ciclos',
      '/jornadas': 'Jornadas',
      '/grandes-obras': 'Grandes Obras',
      '/forja': 'Forja',
      '/astrolabio': 'Astrolábio',
      '/grimorio': 'Grimório',
      '/invocar': 'Invocar',
      '/dominios': 'Domínios',
      '/pilares': 'Pilares Elementais',
    };
    
    return titles[path] || 'Conselho Elemental';
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-glass bg-void/80 border-b border-white/10"
      >
        <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            )}

            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-mystic-gold" />
              <h1 className="font-mystic text-lg tracking-wide bg-gradient-to-r from-mystic-gold to-mystic-arcane bg-clip-text text-transparent">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {rightAction || (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-white/70" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-mystic-gold rounded-full animate-pulse" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAccountModalOpen(true)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <span className="text-xl">{user.avatar}</span>
                </motion.button>
              </>
            )}
          </div>
        </div>

        {isSupabaseAuthEnabled && localMigrationMessage && (
          <div className="px-4 pb-2 max-w-lg mx-auto">
            <p className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] text-emerald-100">
              {localMigrationMessage}
            </p>
          </div>
        )}
      </motion.header>

      <Dialog open={isAccountModalOpen} onOpenChange={setIsAccountModalOpen}>
        <DialogContent className="max-w-md border-white/20 bg-void/95 text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Conta ativa</DialogTitle>
            <DialogDescription>
              {activeAccount ? `Atual: ${activeAccount.name}` : 'Modo local sem conta ativa'}
            </DialogDescription>
          </DialogHeader>

          {isSupabaseAuthEnabled && (
            <div className="space-y-2 rounded-lg border border-white/15 p-3">
              <p className="text-sm font-medium text-white">Sessao Supabase</p>
              <p className="text-xs text-white/70">
                {authUser?.email || 'Usuario autenticado sem email visivel'}
              </p>
              <div className="flex items-center gap-2">
                {isLocalImportEnabled && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    disabled={isMigratingLocalData || localMigrationDone}
                    onClick={() => {
                      void migrateLocalData(false);
                    }}
                  >
                    {isMigratingLocalData
                      ? 'Importando...'
                      : localMigrationDone
                      ? 'Importacao local concluida'
                      : 'Importar dados locais para nuvem'}
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  disabled={isMigratingLocalData}
                  onClick={() => {
                    void restoreFromLocalBackupToCloud();
                  }}
                >
                  {isMigratingLocalData ? 'Restaurando...' : 'Restaurar backup local'}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    void (async () => {
                      await signOut();
                      setIsAccountModalOpen(false);
                      navigate('/auth', { replace: true });
                    })();
                  }}
                >
                  Sair
                </Button>
              </div>
              {localMigrationMessage && (
                <p className="text-xs text-white/70">{localMigrationMessage}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            {accounts.length === 0 ? (
              <p className="text-sm text-white/70">Nenhuma conta criada ainda.</p>
            ) : (
              accounts.map((account) => (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => switchAccount(account.id)}
                  className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
                    account.id === currentAccountId
                      ? 'border-mystic-gold bg-mystic-gold/10'
                      : 'border-white/15 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <span className="mr-2">{account.avatar}</span>
                  <span className="font-medium">{account.name}</span>
                </button>
              ))
            )}
          </div>

          <div className="space-y-3 rounded-lg border border-white/15 p-3">
            <Label htmlFor="new-account-name">Nova conta</Label>
            <Input
              id="new-account-name"
              value={newAccountName}
              onChange={(event) => setNewAccountName(event.target.value)}
              placeholder="Nome da conta"
              className="border-white/20 bg-white/5"
            />
            <div className="flex items-center gap-2">
              <Checkbox
                id="import-account-data"
                checked={importCurrentData}
                onCheckedChange={(checked) => setImportCurrentData(checked === true)}
              />
              <Label htmlFor="import-account-data" className="text-sm text-white/80">
                Importar dados atuais para esta conta
              </Label>
            </div>
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                if (!newAccountName.trim()) return;
                createAccount(newAccountName, importCurrentData);
                setNewAccountName('');
              }}
            >
              Criar e ativar conta
            </Button>
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => navigate('/grimorio')}>
              Abrir Grimorio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
