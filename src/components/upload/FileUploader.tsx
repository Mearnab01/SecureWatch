import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Upload, X, Image, Video, FileWarning } from 'lucide-react';
import { isValidMediaFile, getMediaType, formatFileSize } from '@/utils/validators';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

export function FileUploader({
  onFileSelect,
  accept = 'image/*,video/*',
  maxSize = 50,
  className,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);

    if (!isValidMediaFile(file)) {
      setError('Please upload a valid image or video file');
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setSelectedFile(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onFileSelect(file);
  }, [maxSize, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
  }, []);

  const mediaType = selectedFile ? getMediaType(selectedFile) : null;

  return (
    <div className={cn('w-full', className)}>
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              'relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 cursor-pointer',
              'hover:border-primary/50 hover:bg-primary/5',
              isDragging ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-border',
            )}
          >
            <input
              type="file"
              accept={accept}
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center text-center">
              <div className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors',
                isDragging ? 'bg-primary/20' : 'bg-muted'
              )}>
                <Upload className={cn(
                  'w-8 h-8 transition-colors',
                  isDragging ? 'text-primary' : 'text-muted-foreground'
                )} />
              </div>
              <p className="text-foreground font-medium mb-1">
                Drop your file here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports images and videos up to {maxSize}MB
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative border border-border rounded-lg p-4 bg-card"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFile}
              className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-danger"
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="flex items-start gap-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-lg object-cover border border-border"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center border border-border">
                  {mediaType === 'video' ? (
                    <Video className="w-10 h-10 text-muted-foreground" />
                  ) : (
                    <Image className="w-10 h-10 text-muted-foreground" />
                  )}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatFileSize(selectedFile.size)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {mediaType === 'image' ? (
                    <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                      <Image className="w-3 h-3" /> Image
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                      <Video className="w-3 h-3" /> Video
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-3 text-sm text-danger"
        >
          <FileWarning className="w-4 h-4" />
          {error}
        </motion.div>
      )}
    </div>
  );
}
