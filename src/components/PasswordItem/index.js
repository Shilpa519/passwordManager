import './index.css'

const PasswordItem = props => {
  const {data, passwordStatus, onDeleteList} = props

  const deleteList = () => {
    onDeleteList(data.id)
  }
  return (
    <li className="password-manager-list">
      <p className="initial-letter">
        {data.websiteUrl.slice(0, 1).toUpperCase()}
      </p>
      <div className="names-container">
        <div>
          <p className="name-texts">{data.websiteUrl}</p>
          <p className="name-texts">{data.userName}</p>
          {passwordStatus ? (
            <p className="name-texts">{data.password}</p>
          ) : (
            <img
              className="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
        <button type="button" className="delete-button" data-testid="delete">
          <img
            onClick={deleteList}
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default PasswordItem
