import { TextInput } from 'evergreen-ui'

import styles from './index.module.scss'

interface Props {
  text: string
  value: string
  type?: 'text' | 'password' | string
  placeholder?: string | ''
  name?: string
  className?: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export const CustomTextInput: React.FC<Props> = ({
  text,
  value,
  type = 'text',
  placeholder,
  onChange,
  name,
  className,
}) => {
  return (
    <div>
      <p className={styles.label}>{text}</p>
      <TextInput
        type={type}
        name={name}
        value={value}
        style={{ width: '100%' }}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </div>
  )
}

export default CustomTextInput
