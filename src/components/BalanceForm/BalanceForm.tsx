import { useFormik } from "formik";
import * as Yup from "yup";
import "./BalanceForm.scss";

interface BalanceFormProps {
    onSubmit: (amount: number) => void;
}

export const BalanceForm = ({ onSubmit }: BalanceFormProps) => {

    const formik = useFormik<{ amount: number | "" }>({
        initialValues: { amount: "" },
        validationSchema: Yup.object({
            amount: Yup.number()
                .typeError("Введите число")
                .positive("Сумма должна быть больше 0")
                .required("Обязательное поле"),
        }),
        onSubmit: (values, { resetForm }) => {
            onSubmit(Number(values.amount));
            resetForm();
        },
    });

    return (
        <form className="balance-form" onSubmit={formik.handleSubmit} noValidate>
            <label className="balance-form__label" htmlFor="balance-form-amount">
                Сумма пополнения
            </label>
            <input
                className="balance-form__input"
                id="balance-form-amount"
                name="amount"
                type="number"
                min="0"
                step="any"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={Boolean(formik.touched.amount && formik.errors.amount)}
                aria-describedby={formik.touched.amount && formik.errors.amount ? "balance-form-error" : undefined}
            />
            {formik.touched.amount && formik.errors.amount && (
                <div className="balance-form__error" id="balance-form-error" role="alert">
                    {formik.errors.amount}
                </div>
            )}
            <button className="balance-form__submit" type="submit">
                Пополнить
            </button>
        </form>
    );
};
