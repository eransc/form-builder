import { FC, useState } from 'react';
import styles from './FormBuilder.module.css';
import { FieldInfo } from './types';

interface Props {
    config: FieldInfo[];
    onSubmit: (data: Record<string, string>) => void; 
    action: string;
    method?: 'GET' | 'POST';
}

const FormBuilder: FC<Props> = ({ config, onSubmit, action, method = 'POST' }) => {
    const [formData, setFormData] = useState<Record<string, string>>(
        config.reduce((acc, field) => ({ ...acc, [field.name]: field.value || '' }), {})
    );
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const validateField = (field: FieldInfo): string[] => {
        console.log('field *****', field, field.validators);
        if (!field.validators) return [];
        
        return field.validators
            .filter((validator) => !validator.validate(formData[field.name]))
            .map((validator) => validator.errorMessage);
    };

    const validateForm = (): Record<string, string[]> => {
        const newErrors: Record<string, string[]> = {};
        config.forEach((field) => {
            const fieldErrors = validateField(field);
            if (fieldErrors.length > 0) {
                newErrors[field.name] = fieldErrors;
            }
        });
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            e.preventDefault();
        } else if (onSubmit) {
            e.preventDefault();
            onSubmit(formData);
        }
    };

    return (
        <form 
           className={styles.form} 
           onSubmit={handleSubmit}
           action={action}
           method={method}
           >
            {config.map((field, index) => (
                <div key={index} className={styles.field}>
                    <label htmlFor={field.name}>{field.label}</label>
                    {field.type === 'radio' ? (
                        <input
                        id={field.name}
                        name={field.name} 
                        type="radio"
                        value={field.value || ''} 
                        checked={formData[field.name] === field.value} 
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                       />
                    ) : (
                    <input
                        id={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                    />
                    )}
                    {errors[field.name] && (
                        <ul className={styles.errors}>
                            {errors[field.name].map((error, idx) => (
                                <li key={idx} className={styles.error}>
                                    {error}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormBuilder;
