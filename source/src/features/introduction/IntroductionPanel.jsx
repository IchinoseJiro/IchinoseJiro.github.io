// The moon-button profile popup, website guide button, and quick navigation.
import BrandLogo from '../../components/branding/BrandLogo.jsx'
export default function IntroductionPanel({
  introPosition,
  moveIntroPanel,
  stopIntroDrag,
  startIntroDrag,
  setIntroOpen,
  setGuideOpen,
  setFile,
}) {
  return (
    <aside
      className="intro-panel"
      aria-label="Portfolio introduction"
      style={
        introPosition
          ? { left: introPosition.left, top: introPosition.top, right: 'auto' }
          : undefined
      }
      onPointerMove={moveIntroPanel}
      onPointerUp={stopIntroDrag}
      onPointerCancel={stopIntroDrag}
    >
      <button
        className="intro-close"
        type="button"
        aria-label="Close introduction"
        onClick={() => setIntroOpen(false)}
      >
        ×
      </button>
      <div className="intro-body">
        <small
          className="intro-drag-handle"
          onPointerDown={startIntroDrag}
          title="Drag to move this panel"
        >
          ⠿ &nbsp; HELLO, WORLD <span>DRAG TO MOVE</span>
        </small>
        <h1>
          I'm <em>Jireh</em>.
        </h1>
        <h2>Web developer & lifelong learner.</h2>
        <p>
          I am Lowell Jireh P. Chantengco, an Information Technology graduate specializing in web
          development. I enjoy creating responsive websites and solving practical technical
          problems.
        </p>
        <button type="button" className="intro-guide-button" onClick={() => setGuideOpen(true)}>
          <span aria-hidden="true">ⓘ</span> How to use this website
        </button>
        <div className="cta-row">
          <button onClick={() => setFile('experience.jsx')}>My experience ↗</button>
          <button className="secondary" onClick={() => setFile('contact.jsx')}>
            Get in touch
          </button>
        </div>
        <div className="intro-profile">
          <div className="monogram">
            <BrandLogo />
          </div>
          <div>
            <strong>Lowell Jireh P. Chantengco</strong>
            <span>🟢 Open to opportunities</span>
            <small>WEB DEVELOPER · IT SUPPORT</small>
          </div>
        </div>
      </div>
    </aside>
  )
}
