import { Context } from "index";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ModalStore from "store/ModalStore";

const RegistrationModal = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const userStore = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        mode: 'onChange',
    });

    const submit = (form) => {
        userStore.register(form.name, form.email, form.password, (error) => {
            if(error) {
                setError(true);
                setSuccess(false);
            } else {
                setError(false);
                setSuccess(true);
            }
        });
    }

    if (!ModalStore.isShowRegistration) {
        return <></>
    }

    return (
        <div>
            <div className="modal-backdrop opacity-50"></div>
            <div className="modal show" style={{ display: "block" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Регистрация</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть" onClick={() => ModalStore.showLogin(false)} />
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(submit)} autoComplete="off" noValidate>
                                <div>
                                    <label className="col-form-label">Имя</label>
                                    <input className="form-control" name="name" type="text" {...register('name', { required: true })} />
                                    {errors.name?.type === 'required' && <div className="error">Поле обязательное</div>}
                                </div>
                                <div>
                                    <label className="col-form-label">Email</label>
                                    <input className="form-control" name="email" type="text" {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })} />
                                    {errors.email?.type === 'required' && <div className="error">Поле обязательное</div>}
                                    {errors.email?.type === 'pattern' && <div className="error">Некорректный email</div>}
                                    {error && <div className="error">Пользователь с таким email уже существует</div>}
                                </div>
                                <div>
                                    <label className="col-form-label">Пароль</label>
                                    <input className="form-control" name="password" type="password" {...register('password', { required: true })} />
                                    {errors.password?.type === 'required' && <div className="error">Поле обязательное</div>}
                                </div>
                                <div>
                                    <label className="col-form-label">Подтверждение пароля</label>
                                    <input className="form-control" name="passwordConfirm" type="password" {...register('passwordConfirm', { required: true, validate: { confirm: (value) => value === getValues('password') } })} />
                                    {errors.passwordConfirm?.type === 'required' && <div className="error">Поле обязательное</div>}
                                    {errors.passwordConfirm?.type === 'confirm' && <div className="error">Пароли не совпадают</div>}
                                </div>
                                {success && <div className="success">Регистрация прошла успешно</div>}
                                <div className="d-flex flex-column justify-content-center mt-3">
                                    <button type="submit" className="btn border border-2 border-primary text-primary mx-auto">Зарегистрироваться</button>
                                    <a className="btn btn-link p-0 small-text my-1" onClick={() => ModalStore.showLogin(true)}>Уже есть аккаунт?</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(RegistrationModal);