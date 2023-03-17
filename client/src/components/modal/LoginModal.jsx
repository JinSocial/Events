import { Context } from "index";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ModalStore from "store/ModalStore";

const LoginModal = () => {
    const userStore = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
    });

    const submit = (form) => {
        userStore.login(form.email, form.password, () => {ModalStore.showLogin(false)});
    }

    if (!ModalStore.isShowLogin) {
        return <></>
    }

    return (
        <div>
            <div className="modal-backdrop opacity-50"></div>
            <div className="modal show" style={{ display: "block" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Вход</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть" onClick={() => ModalStore.showLogin(false)} />
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(submit)} className="needs-validation">
                                <div>
                                    <label className="col-form-label">Email</label>
                                    <input className="form-control" name="email" type="text" {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })} />
                                    {errors.email?.type === 'required' && <div className="error">Поле обязательное</div>}
                                    {errors.email?.type === 'pattern' && <div className="error">Некорректный email</div>}
                                </div>
                                <div>
                                    <label className="col-form-label">Пароль</label>
                                    <input className="form-control" name="password" type="password" {...register('password', { required: true })} />
                                    {errors.password?.type === 'required' && <div className="error">Поле обязательное</div>}
                                </div>
                                <div className="d-flex flex-column justify-content-center mt-3">
                                    <button type="submit" className="btn border border-2 border-primary text-primary mx-auto">Войти</button>
                                    <a className="btn btn-link p-0 small-text my-1" onClick={() => ModalStore.showRegistration(true)}>Не зарегистрированы?</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(LoginModal);