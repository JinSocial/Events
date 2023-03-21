import { observer } from "mobx-react-lite";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import ModalStore from "store/ModalStore";
import ProjectStore from "store/ProjectStore";

const CreateProjectOffcanvas = () => {
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
    });

    const submit = (form) => {
        ProjectStore.create(form.title, form.description, date, (error) => {
            if(error) {
                setError(true);
            } else {
                setError(false);
                ModalStore.showCreateProjectOffcanvas(false);
            }
        });
    }

    if (!ModalStore.isCreateProjectOffcanvas) {
        return <></>
    }

    return (
        <div className="offcanvas offcanvas-start show" id="offcanvas" aria-labelledby="offcanvasLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel">Создать проект</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Закрыть" onClick={() => ModalStore.showCreateProjectOffcanvas(false)}></button>
            </div>
            <div className="offcanvas-body">
                <form onSubmit={handleSubmit(submit)} className="needs-validation">
                    <div>
                        <label className="col-form-label">Название</label>
                        <input className="form-control" name="title" type="text" {...register('title', { required: true })} />
                        {errors.title?.type === 'required' && <div className="error">Поле обязательное</div>}
                    </div>
                    <div>
                        <label className="col-form-label">Описание</label>
                        <textarea className="form-control" name="description" type="text" {...register('description', { required: true })} />
                        {errors.description?.type === 'required' && <div className="error">Поле обязательное</div>}
                    </div>
                    <div>
                        <label className="col-form-label">Дата окончания</label>
                        <DateTimePicker className="form-control border-0 p-0" name="date" value={date} onChange={setDate}/>
                    </div>
                    <div className="d-flex flex-column justify-content-center mt-3">
                        <button type="submit" className="btn border border-2 border-primary text-primary mx-auto">Создать</button>
                        {error && <div className="error mx-auto">Не удалось создать проект</div>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default observer(CreateProjectOffcanvas);