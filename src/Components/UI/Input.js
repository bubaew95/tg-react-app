

export const Input = ({type = 'text', placeholder = '', onChange = null, value = null}) => {
    return (
        <div className="mb-3">
            <input
                type={type} 
                className="form-control" 
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}