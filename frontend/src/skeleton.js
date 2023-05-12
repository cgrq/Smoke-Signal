function Skeloton() {
  return (
    <div>
      {sessionUser ? (
        <div>
          {/* Left Column */}
          <div>
            {/* Logo */}
            <div></div>
            {/* Team Picker */}
            <div></div>
            {/* Channels */}
            <div>
              <h3></h3>
              <ul>
                <li></li>
              </ul>
            </div>
            {/* Direct Messages */}
            <div>
              <h3></h3>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
          {/* Right Column */}
          <div>
            {/* Nav/Search */}
            <div>
              <input />
              <div></div>
            </div>
            {/* Message feed */}
            <div>
              <ul>
                <li>
                  <div></div>
                  <div></div>
                </li>
              </ul>
            </div>
            {/* Message Input */}
            <div>
              <textarea />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Nav */}
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          {/* Section one */}
          <div>
            <div></div>
            <div></div>
          </div>
          {/* Section two */}
          <div>
            <div>
              <div>
                <img />
              </div>
              <div>
                <h1></h1>
                <p></p>
              </div>
            </div>
            <div>
              <div>
                <h1></h1>
                <p></p>
              </div>
              <div>
                <img />
              </div>
            </div>
            <div>
              <div>
                <img />
              </div>
              <div>
                <h1></h1>
                <p></p>
              </div>
            </div>
          </div>
          {/* Section three */}
          <div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
