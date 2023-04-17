import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    websiteUrl: '',
    userName: '',
    password: '',
    searchInput: '',
    passwordList: [],
    showPassword: false,
    searchedList: [],
  }

  onChangeWebsiteUrl = event => {
    this.setState({websiteUrl: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  searchPasswordsList = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchResult = () => {
    const {searchInput, passwordList} = this.state
    const searchResult = passwordList.filter(eachItem =>
      eachItem.websiteUrl.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResult
  }

  onSubmitPasswordForm = event => {
    event.preventDefault()
    const {websiteUrl, userName, password} = this.state
    if (websiteUrl && userName && password !== '') {
      const passwordObject = {
        id: uuidv4(),
        websiteUrl,
        userName,
        password,
      }
      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, passwordObject],
        websiteUrl: '',
        userName: '',
        password: '',
      }))
    }
  }

  setShowPasswordStatus = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onDelete = id => {
    const {passwordList} = this.state
    const afterDeletedList = passwordList.filter(eachItem => eachItem.id !== id)
    this.setState({passwordList: afterDeletedList})
  }

  render() {
    const {
      websiteUrl,
      userName,
      password,
      searchInput,
      passwordList,
      showPassword,
    } = this.state
    const searchData = this.getSearchResult()

    return (
      <div className="app-background">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="form-background">
          <form className="form" onSubmit={this.onSubmitPasswordForm}>
            <h1 className="add-new-password-text">Add New Password</h1>
            <div className="input-container">
              <img
                className="icons"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                value={websiteUrl}
                onChange={this.onChangeWebsiteUrl}
                placeholder="Enter Website"
                className="input"
                type="text"
              />
            </div>
            <div className="input-container">
              <img
                className="icons"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                value={userName}
                onChange={this.onChangeUserName}
                placeholder="Enter Username"
                className="input"
                type="text"
              />
            </div>
            <div className="input-container">
              <img
                className="icons"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                value={password}
                onChange={this.onChangePassword}
                placeholder="Enter Password"
                className="input"
                type="password"
              />
            </div>
            <button className="add-button" type="submit">
              Add
            </button>
          </form>
          <img
            className="password-manager-img"
            src={
              window.innerWidth <= 767
                ? 'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
            }
            alt="password manager"
          />
        </div>
        <div className="form-background bgm2">
          <div className="header-container">
            <div className="count-container span">
              <h1 className="add-new-password-text"> </h1>
              Your Passwords
              <p className="count-para">{passwordList.length}</p>
            </div>
            <div className="input-container-search">
              <img
                placeholder="Search"
                className="icons"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                value={searchInput}
                onChange={this.searchPasswordsList}
                placeholder="Search"
                className="input search-input"
                type="search"
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="checkbox-container">
            <input
              onChange={this.setShowPasswordStatus}
              id="checkbox"
              className="checkbox"
              type="checkbox"
            />
            <label className="label" htmlFor="checkbox">
              {showPassword ? 'Hide Passwords' : 'Show Passwords'}
            </label>
          </div>
          {searchData.length === 0 ? (
            <div className="no-passwords-container">
              <img
                className="no-passwords-img"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                alt="no passwords"
              />
              <p className="add-new-password-text">No Passwords</p>
            </div>
          ) : (
            <ul className="list-container">
              {searchData.map(eachItem => (
                <PasswordItem
                  onDeleteList={this.onDelete}
                  passwordStatus={showPassword}
                  key={eachItem.id}
                  data={eachItem}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManager
