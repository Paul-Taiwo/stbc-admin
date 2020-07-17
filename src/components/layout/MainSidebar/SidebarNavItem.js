import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import { Dispatcher, Constants } from "../../../flux";
import {
  NavItem,
  NavLink,
  Collapse,
  DropdownMenu,
  DropdownItem,
} from "shards-react";

class SidebarNavItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown(item) {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR_DROPDOWN,
      payload: item,
    });
  }

  render() {
    const { item } = this.props;
    const hasSubItems = item.items && item.items.length;

    return (
      <NavItem style={{ position: "relative" }}>
        <NavLink
          className={hasSubItems && "dropdown-toggle"}
          tag={hasSubItems ? "a" : RouteNavLink}
          to={hasSubItems ? "#" : item.to}
          onClick={() => this.toggleDropdown(item)}>
          {item.htmlBefore && (
            <div
              className='d-inline-block item-icon-wrapper'
              dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
            />
          )}
          {item.title && <span>{item.title}</span>}
          {item.htmlAfter && (
            <div
              className='d-inline-block item-icon-wrapper'
              dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
            />
          )}
        </NavLink>
        {hasSubItems && (
          <Collapse
            tag={DropdownMenu}
            small
            open={item.open}
            style={{ top: 0 }}>
            {item.items.map((subItem, idx) => (
              <DropdownItem key={idx} tag={RouteNavLink} to={subItem.to}>
                {subItem.title}
              </DropdownItem>
            ))}
          </Collapse>
        )}
      </NavItem>
    );
  }
}

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object,
};

export default SidebarNavItem;
