const ExperienceBar: React.FC = () => {
  return (
    <header className="experience-bar">
      <span>0x</span>
      <div>
        <div style={{ width: '50%' }} ></div>

        <span className="current-experience" style={{ left: '50%' }}> 300xp </span>
      </div>

      <span>600xp</span>
    </header>
  )
}

export default ExperienceBar;