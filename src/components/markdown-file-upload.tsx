import { useCallback, useRef, useState } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { uploadMarkdownFn } from "@/features/posts/api/posts.admin.api";

interface MarkdownFileUploadProps {
  onContentLoad: (content: string, fileName?: string) => void;
  disabled?: boolean;
}

export function MarkdownFileUpload({
  onContentLoad,
  disabled = false,
}: MarkdownFileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseMarkdown = useCallback(async (file: File) => {
    setIsLoading(true);
    try {
      // Upload to server using FormData
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadMarkdownFn({ data: formData });
      setFileName(result.fileName);
      onContentLoad(result.content, result.fileName);
      toast.success("Markdown 文件已加载", {
        description: `已加载 ${result.fileName}`,
      });
    } catch (error) {
      console.error("Markdown upload error:", error);
      toast.error("加载失败", {
        description: error instanceof Error ? error.message : "无法上传 Markdown 文件",
      });
    } finally {
      setIsLoading(false);
    }
  }, [onContentLoad]);

  const handleFileSelect = useCallback((file: File | null) => {
    if (!file) return;

    if (file.type !== "text/markdown" && file.type !== "text/plain" && !file.name.endsWith(".md")) {
      toast.error("无效的文件类型", {
        description: "请上传 .md 文件",
      });
      return;
    }

    parseMarkdown(file);
  }, [parseMarkdown]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }, [disabled, handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
    // Reset input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [handleFileSelect]);

  const handleClear = useCallback(() => {
    setFileName(null);
    onContentLoad("", undefined);
    toast.info("已清除上传的内容");
  }, [onContentLoad]);

  return (
    <div className="space-y-2">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg p-6 transition-all
          ${isDragging
            ? "border-primary bg-primary/5"
            : "border-border/50 hover:border-primary/50"
          }
          ${disabled ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,text/markdown"
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-2 py-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">正在加载...</p>
          </div>
        ) : fileName ? (
          <div className="flex items-center justify-between gap-4 py-2">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium text-sm">{fileName}</p>
                <p className="text-xs text-muted-foreground">点击上传按钮可替换文件</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClear}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-2 py-6 text-muted-foreground hover:text-primary transition-colors"
          >
            <Upload className="w-8 h-8" />
            <div className="text-center">
              <p className="text-sm font-medium">
                点击上传或拖拽 Markdown 文件到此处
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                仅支持 .md 文件
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
