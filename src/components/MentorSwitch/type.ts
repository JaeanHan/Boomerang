export interface SelectFormProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  formValues: FormValues;
}

export interface TextareaFormProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface InputFormProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormValues {
  mentor_type: 'LAWYER' | 'REAL_ESTATE_AGENT' | 'PREVIOUS_DAMAGE_RESOLVER';
  career: string;
  introduce: string;
  contact: string;
}

export interface emailType {
  email: string;
}

export interface emailVaildationType {
  email: string;
  verificationCode: string;
}

export interface ValidationResponse {
  code: string;
  message: string;
}

export interface SendResponse {
  email: string;
  message: string;
}

export interface SwitchResponse {
  id: number;
  mentor_type: 'LAWYER' | 'REAL_ESTATE_AGENT' | 'PREVIOUS_DAMAGE_RESOLVER';
  career: string;
  introduce: string;
  advertisement_status: boolean;
  contact: string;
}
