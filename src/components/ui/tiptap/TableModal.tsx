import { Button } from "../Button";

interface TableModalProps {
  showTableModal: boolean;
  setShowTableModal: (show: boolean) => void;
  tableRows: string;
  setTableRows: (rows: string) => void;
  tableCols: string;
  setTableCols: (cols: string) => void;
  tableWithHeader: boolean;
  setTableWithHeader: (withHeader: boolean) => void;
  onInsert: () => void;
}

export function TableModal({
  showTableModal,
  setShowTableModal,
  tableRows,
  setTableRows,
  tableCols,
  setTableCols,
  tableWithHeader,
  setTableWithHeader,
  onInsert,
}: TableModalProps) {
  if (!showTableModal) return null;

  const handleInsert = () => {
    onInsert();
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleInsert();
        } else if (e.key === "Escape") {
          setShowTableModal(false);
        }
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Insert Table</h3>
        <p className="text-sm text-gray-600 mb-4">
          Press{" "}
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd>{" "}
          to insert table,
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Tab</kbd> to
          navigate fields,
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> to
          cancel
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Number of Rows (1-20)
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={tableRows}
              onChange={(e) => setTableRows(e.target.value)}
              autoFocus
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Number of Columns (1-10)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={tableCols}
              onChange={(e) => setTableCols(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="tableHeader"
              checked={tableWithHeader}
              onChange={(e) => setTableWithHeader(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="tableHeader" className="text-sm font-medium">
              Include header row
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            onClick={handleInsert}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                handleInsert();
              }
            }}
          >
            Insert Table
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowTableModal(false)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                setShowTableModal(false);
              }
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
