import { Dispatch, SetStateAction } from 'react';

import {
  FormValues,
  InputFormProps,
  SelectFormProps,
  TextareaFormProps,
} from '@/components/MentorSwitch/type';
import { BoomerangButton } from '@/components/commons/BoomerangButton';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';

interface EmailFormProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  sendEmailCode: () => void;
}

export const SelectForm: React.FC<SelectFormProps> = ({
  id,
  onChange,
  options,
  formValues,
}) => (
  <Select
    h="60px"
    id={id}
    value={formValues[id as keyof FormValues]}
    onChange={onChange}
    _focus={{
      boxShadow: 'none',
    }}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Select>
);

export const TextareaForm: React.FC<TextareaFormProps> = ({
  id,
  placeholder,
  value,
  onChange,
}) => (
  <Textarea
    h="150px"
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    _focus={{
      boxShadow: 'none',
    }}
    resize="none"
  />
);

export const InputForm: React.FC<InputFormProps> = ({
  id,
  placeholder,
  value,
  onChange,
}) => (
  <Input
    h="60px"
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    _focus={{
      boxShadow: 'none',
    }}
  />
);

interface ValidationFormProps {
  emailCode: string;
  setEmailCode: Dispatch<SetStateAction<string>>;
  onClick: () => void;
  isValidate: boolean;
}

export const ValidationForm: React.FC<ValidationFormProps> = ({
  emailCode,
  setEmailCode,
  onClick,
  isValidate,
}) => {
  return (
    <FormControl mb={4}>
      <FormLabel color="#176CFF" fontSize="18px" fontWeight={800}>
        이메일 인증
      </FormLabel>
      <Flex gap="30px">
        <Input
          h="60px"
          placeholder={
            isValidate ? '인증되었습니다.' : '이메일 코드는 5분간 유효합니다.'
          }
          value={emailCode}
          onChange={(e) => setEmailCode(e.target.value)}
          _focus={{
            boxShadow: 'none',
          }}
          type="email"
          isDisabled={isValidate}
        />
        <BoomerangButton
          w="100px"
          h="60px"
          fontSize="20px"
          onClick={onClick}
          isDisabled={isValidate}
        >
          {isValidate ? '완료' : '인증'}
        </BoomerangButton>
      </Flex>
    </FormControl>
  );
};

export const EmailForm: React.FC<EmailFormProps> = ({
  email,
  setEmail,
  sendEmailCode,
}) => {
  return (
    <FormControl mb={4}>
      <FormLabel color="#176CFF" fontSize="18px" fontWeight={800}>
        이메일 전송
      </FormLabel>
      <Flex gap="30px">
        <Input
          h="60px"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          _focus={{
            boxShadow: 'none',
          }}
          type="email"
        />
        <BoomerangButton
          w="100px"
          h="60px"
          fontSize="20px"
          onClick={sendEmailCode}
        >
          {'전송'}
        </BoomerangButton>
      </Flex>
    </FormControl>
  );
};
