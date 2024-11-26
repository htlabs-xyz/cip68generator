import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { compareJson, DiffResult } from "@/utils/json-diff";

interface JsonDiffViewerProps {
  oldJson: Record<string, string>;
  newJson: Record<string, string>;
}

export function JsonDiffViewer({ oldJson, newJson }: JsonDiffViewerProps) {
  const diffResult = compareJson(oldJson, newJson);

  return (
    <div className="w-full mx-auto bg-transparent">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Old Version</h3>
          <ScrollArea className="h-[400px] rounded-md border">
            <pre className="text-sm p-4">
              {renderJsonDiff(diffResult, "old")}
            </pre>
          </ScrollArea>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">New Version</h3>
          <ScrollArea className="h-[400px] rounded-md border">
            <pre className="text-sm p-4">
              {renderJsonDiff(diffResult, "new")}
            </pre>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

function renderJsonDiff(
  diffResult: DiffResult[],
  version: "old" | "new",
): JSX.Element {
  const jsonLines: JSX.Element[] = [<span key="start">{"{"}</span>];

  diffResult.forEach((item, index) => {
    const value = version === "old" ? item.oldValue : item.newValue;
    if (value !== null) {
      let bgColor = "";
      if (item.status === "added" && version === "new") {
        bgColor = "bg-green-500 dark:bg-green-900";
      } else if (item.status === "removed" && version === "old") {
        bgColor = "bg-red-500 dark:bg-red-900";
      } else if (item.status === "changed") {
        bgColor = "";
      }

      jsonLines.push(
        <span key={item.key} className={`block ${bgColor}`}>
          {`  "${item.key}": "${value}"${index < diffResult.length - 1 ? "," : ""}`}
        </span>,
      );
    }
  });

  jsonLines.push(<span key="end">{"}"}</span>);

  return <>{jsonLines}</>;
}
