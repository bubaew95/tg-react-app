

export const Textarea = ({placeholder = '', onChange = null, value = null}) => {
    return (
        <div className="mb-3">
            <textarea 
                className="form-control" 
                placeholder={placeholder} 
                rows="3"
                onChange={onChange}
                defaultValue={value}
            > 
            </textarea>
        </div>
    )
}