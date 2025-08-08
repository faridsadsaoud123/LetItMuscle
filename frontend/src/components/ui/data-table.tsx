import React from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Pencil, Trash2, Search, Filter } from 'lucide-react';
import { cn2 } from '../../lib/utils';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAdd?: () => void;
  addButtonText?: string;
  isLoading?: boolean;
  className?: string;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = "Rechercher par nom, prénom...",
  onEdit,
  onDelete,
  onAdd,
  addButtonText = "Ajouter un utilisateur",
  isLoading = false,
  className
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (!search) return data;
    
    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted-foreground">Chargement...</span>
      </div>
    );
  }

  return (
    <div className={cn2("space-y-6", className)}>
      {/* Header with search and add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {searchable && (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary/30 border-border"
            />
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          
          {onAdd && (
            <Button 
              variant="hero" 
              onClick={onAdd}
              className="gap-2"
            >
              <span className="text-lg">+</span>
              {addButtonText}
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden shadow-card">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn2(
                    "px-6 py-4 text-left text-sm font-medium text-foreground",
                    column.className
                  )}
                >
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredData.map((item, index) => (
              <tr
                key={item.id}
                className={cn2(
                  "hover:bg-secondary/30 transition-colors",
                  index % 2 === 0 ? "bg-card" : "bg-secondary/10"
                )}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={cn2(
                      "px-6 py-4 text-sm text-foreground",
                      column.className
                    )}
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key])
                    }
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(item)}
                          className="text-success hover:text-success/80 hover:bg-success/10"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(item)}
                          className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun résultat trouvé</p>
          </div>
        )}
      </div>

      {/* Status Legend */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span>Actif</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <span>Inactif</span>
        </div>
      </div>
    </div>
  );
}