import { useMemo, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import './SortedTable.css';

interface TableData {
  [key: string]: string | number;
}

interface SortableTableProps {
  data: TableData[];
  columns: string[];
  columnDisplayNames: { [key: string]: string }
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const SortableTable: React.FC<SortableTableProps> = ({ data, columns, columnDisplayNames, onUpdate, onDelete }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (column: string) => {
    if (!sortConfig) {
      return null;
    }
    if (sortConfig.key === column) {
      return sortConfig.direction === 'ascending' ? (
        '▲'
      ) : (
        '▼'
      );
    }
    return null;
  };

  return (
    <div className="table-wrapper" style={{ width: '1200px', height: '600px', overflow: 'auto', margin: '0 auto' }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} onClick={() => requestSort(column)} style={{ cursor: 'pointer' }}>
                {columnDisplayNames[column]} {getSortIcon(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
              <td>
                <Button variant="warning" onClick={() => onUpdate(row.id as number)} className="me-2">
                  Atualizar
                </Button>
                <Button variant="danger" onClick={() => onDelete(row.id as number)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SortableTable;
