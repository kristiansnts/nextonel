/**
 * Type definitions for ShadPanel
 * Re-exports types from Form Builder and Data Table systems
 */

// Re-export Form Builder types
export type {
  ValidationRule,
  BaseFieldProps,
  TextInputProps,
  TextareaProps,
  CheckboxProps,
  ToggleProps,
  SelectProps,
  TagsInputProps,
  DatePickerProps,
  DateTimePickerProps,
  FileUploadProps,
  KeyValueProps,
  MarkdownEditorProps,
  RichEditorProps,
  GridProps,
  SectionProps,
  FieldsetProps,
  TabsProps,
  GroupProps,
  PlaceholderProps,
  FormContextValue,
  FieldComponentProps,
} from "../components/ui/form-builder/types"

// Re-export Data Table types
export type {
  BaseColumnProps,
  TextColumnProps,
  ImageColumnProps,
  ActionProps,
  ColumnComponentProps,
} from "../components/ui/data-table/types"
