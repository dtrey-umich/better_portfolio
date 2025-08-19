export function IconSprite() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        {/* Research */}
        <symbol id="research" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          <circle cx="9" cy="11" r="1"/>
          <path d="M21 21l-6-6"/>
          <circle cx="15" cy="15" r="4"/>
        </symbol>
        
        {/* Robotics */}
        <symbol id="robotics" viewBox="0 0 24 24">
          <rect x="6" y="10" width="12" height="8" rx="2"/>
          <path d="M8 10V7a4 4 0 0 1 8 0v3"/>
          <circle cx="9" cy="13" r="1"/>
          <circle cx="15" cy="13" r="1"/>
          <path d="M9 16h6"/>
          <path d="M4 14h2m12 0h2"/>
        </symbol>
        
        {/* Software */}
        <symbol id="software" viewBox="0 0 24 24">
          <path d="M16 18l6-6-6-6"/>
          <path d="M8 6l-6 6 6 6"/>
          <path d="M12 2L8 22"/>
        </symbol>
        
        {/* Sculpture */}
        <symbol id="sculpture" viewBox="0 0 24 24">
          <path d="M12 2L8 7h8l-4-5z"/>
          <path d="M8 7l-2 5h12l-2-5"/>
          <path d="M6 12l-2 5h16l-2-5"/>
          <path d="M4 17l-2 5h20l-2-5"/>
        </symbol>
        
        {/* Videography */}
        <symbol id="videography" viewBox="0 0 24 24">
          <polygon points="23 7 16 12 23 17 23 7"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          <circle cx="8" cy="9" r="1"/>
        </symbol>
        
        {/* Play */}
        <symbol id="play" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="10,8 16,12 10,16 10,8"/>
        </symbol>
      </defs>
    </svg>
  );
}
