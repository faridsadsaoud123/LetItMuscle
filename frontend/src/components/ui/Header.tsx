import React from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Bell, Search, User, Users } from 'lucide-react';
import { cn2 } from '../../lib/utils';

interface HeaderProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  className, 
  title = "Gestion des Utilisateurs",
  subtitle 
}) => {
  return (
    <header className={cn2(
      "flex items-center justify-between p-6 bg-card border-b border-border shadow-card",
      className
    )}>
      {/* Title Section */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            className="pl-10 w-64 bg-secondary/50 border-border"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Profile */}
        <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-foreground">Farid Admin</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};