import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

type ConfirmProps = {
  message: string;
  resolve: (value: boolean) => void;
  cleanup: () => void;
};

function ConfirmDialog({ message, resolve, cleanup }: ConfirmProps) {
  const close = (result: boolean) => {
    resolve(result);
    cleanup();
  };

  return (
    <Dialog open={true} onClose={() => close(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white dark:bg-highlightednotecolor rounded-lg shadow-xl p-6 w-full max-w-md">
          <DialogTitle className="text-lg font-semibold text-menutextcolor">
            Delete
          </DialogTitle>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {message}
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => close(false)}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-200"
            >
              Cancel
            </button>

            <button
              onClick={() => close(true)}
              className="px-4 py-2 rounded bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export function confirmDeleteDialog(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const root: Root = createRoot(container);

    const cleanup = () => {
      root.unmount();
      container.remove();
    };

    root.render(
      <ConfirmDialog message={message} resolve={resolve} cleanup={cleanup} />,
    );
  });
}
