import './index.css'

const PasswordItem = props => {
  const {data, passwordStatus, onDeleteList} = props
  const {id, websiteUrl, userName, password} = data

  const deleteList = () => {
    onDeleteList(id)
  }
  return (
    <li className="password-manager-list">
      <p className="initial-letter">
        {data.websiteUrl.slice(0, 1).toUpperCase()}
      </p>
      <div className="names-container">
        <div>
          <p className="name-texts">{websiteUrl}</p>
          <p className="name-texts">{userName}</p>
          {passwordStatus ? (
            <p className="name-texts">{password}</p>
          ) : (
            <img
              className="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
        <button
          type="button"
          className="delete-button"
          data-testid="delete"
          onClick={deleteList}
        >
          <img
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
