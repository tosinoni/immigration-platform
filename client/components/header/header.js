import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'

import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
} from 'reactstrap'

import profileImage from '../../assets/profile-image.png'
import './header.scss'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: 'navbar-transparent',
    }

    this.updateColor = this.updateColor.bind(this)
    this.toggleCollapse = this.toggleCollapse.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateColor)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateColor)
  }

  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: 'bg-white',
      })
    } else {
      this.setState({
        color: 'navbar-transparent',
      })
    }
  }
  // this function opens and closes the collapse on small devices
  toggleCollapse() {
    if (this.state.collapseOpen) {
      this.setState({
        color: 'navbar-transparent',
      })
    } else {
      this.setState({
        color: 'bg-white',
      })
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    })
  }

  render() {
    return (
      <Fragment>
        <Navbar className={classNames('navbar-absolute', this.state.color)} expand="lg">
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames('navbar-toggle d-inline', {
                  toggled: this.props.sidebarOpened,
                })}
              >
                <button className="navbar-toggler" type="button" onClick={this.props.toggleSidebar}>
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler navigation"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab kebab2" />
              <span className="navbar-toggler-bar navbar-kebab kebab3" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                <form>
                  <InputGroup className="no-border">
                    <Input placeholder="Search..." />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <FontAwesome className="icon" name="search" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={e => e.preventDefault()}
                  >
                    <div className="image-container">
                      <img className="image" src={profileImage} />
                    </div>
                    <b className="caret d-none d-lg-block d-xl-block" />
                    <p className="d-lg-none">Log out</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">Settings</DropdownItem>
                    </NavLink>
                    <DropdownItem divider tag="li" />
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">Log out</DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Fragment>
    )
  }
}

export default Header
