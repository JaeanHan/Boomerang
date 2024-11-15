export interface FormData {
  [key: string]: string;
}

export interface FieldType {
  id: number;
  label: string;
  type?: 'text' | 'checkbox';
}

export interface FormProps {
  title: string;
  description: string;
  image: string;
  fields: FieldType[];
}
