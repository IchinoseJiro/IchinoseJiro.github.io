// Top menus shared by Code view and Simple view; commands are supplied by App.
export default function ApplicationMenu({
  isSimple,
  navigationVisible,
  toggleNavigation,
  menuNames,
  openMenu,
  toggleMenu,
  menuAnchor,
  applicationMenuKeys,
  menuActions,
  viewMode,
  runMenuAction,
}) {
  return (
    <>
      <nav
        className={'menubar menu-root' + (isSimple ? ' simple-menubar' : '')}
        aria-label="Application menu"
      >
        {!isSimple && (
          <button
            className="navigation-toggle"
            type="button"
            onClick={toggleNavigation}
            aria-label={navigationVisible ? 'Hide left navigation' : 'Show left navigation'}
            title={navigationVisible ? 'Hide left navigation' : 'Show left navigation'}
            aria-expanded={navigationVisible}
          >
            ◧<span>{navigationVisible ? 'Hide' : 'Show'} navigation</span>
          </button>
        )}
        {(isSimple ? ['File', 'View', 'Go', 'Help'] : menuNames).map((name) => (
          <div className="menu-entry" key={name}>
            <button
              className={'menu-trigger ' + (openMenu === name ? 'active' : '')}
              data-menu-name={name}
              aria-label={name}
              type="button"
              aria-haspopup="true"
              aria-expanded={openMenu === name}
              aria-controls={openMenu === name ? 'application-dropdown' : undefined}
              onClick={(event) => toggleMenu(name, event)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  if (openMenu !== name) toggleMenu(name, event)
                }
              }}
            >
              {name}
            </button>
          </div>
        ))}
      </nav>
      {openMenu && (
        <div
          id="application-dropdown"
          className="dropdown menu-root"
          role="menu"
          aria-label={openMenu}
          style={menuAnchor}
          onKeyDown={applicationMenuKeys}
        >
          {menuActions[openMenu].map(([label, shortcut, action]) => (
            <button
              type="button"
              role={
                openMenu === 'View' && ['Simple view', 'Code view'].includes(label)
                  ? 'menuitemradio'
                  : 'menuitem'
              }
              aria-checked={
                openMenu === 'View' && ['Simple view', 'Code view'].includes(label)
                  ? viewMode === label.split(' ')[0].toLowerCase()
                  : undefined
              }
              className="dropdown-item"
              key={`${openMenu}-${label}`}
              onClick={() => runMenuAction(action)}
            >
              <span>{label}</span>
              <small>{shortcut}</small>
            </button>
          ))}
        </div>
      )}{' '}
    </>
  )
}
