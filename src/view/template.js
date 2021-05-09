const template = (...properties) => {
  const [props] = properties;
  
  return `<h3>Hi there</h3>
<p>My name is Maurício, and I am study Information Systems at Federal University of Santa Maria (UFSM-FW)</p>
<p></p>
<hr/>
<section>
  <h3>Social media</h3>
  <a href="https://telegram.me/rwietter" alt="Telegram">
    <img src="https://img.shields.io/badge/-Telegram-007ACC?style=for-the-badge&logo=telegram&logoColor=white&link=https://telegram.me/rwietter"/>
  </a>
  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mauriciobw17@gmail.com" alt="Gmail">
    <img src="https://img.shields.io/badge/-Gmail-c5211f?style=for-the-badge&logo=Gmail&logoColor=white&link=https://mail.google.com/mail/?view=cm&fs=1&to=mauriciobw17@gmail.com" />
  </a>
  <a href="https://www.codewars.com/users/rwietter" alt="Codewars">
    <img src="https://img.shields.io/badge/-Codewars-1d1d1f?style=for-the-badge&logo=Codewars&logoColor=white"/>
  </a>
</section>
<hr/>
<section>
  <h3>Challenges</h3>
  <a href="">
    <img src="https://www.codewars.com/users/rwietter/badges/micro" />
  </a>
</section>
<hr/>

<h3>What am I doing</h3>
<div align="right">
<code># nitrogen --save tux.png</code>
<img width="230" height="230" align="right" title="A Tux icon" src="https://i.imgur.com/sgOrQYi.png"/>
</div>
<p><strong>⇒ OS:</strong>${props.osName} ● Kernel v${props.kernelVersion}</p>
<p><strong>⇒ Shell:</strong> ${props.shell.toUpperCase()}</p>
<p><strong>⇒ Uptime:</strong> ${props.uptime}</p>
<p><strong>⇒ Used Mem:</strong> ${props.usedMem}</p>
<p><strong>⇒ Last commit:</strong> ${props.lastCommitDate} ${props.lastCommitTime}</p>

<hr/>

<details>
  <summary>
    <strong id="content"> ♫ Playlist | <span>${props.totalPlaylistTime} min</span> </strong>
  </summary><br/>
  <ol>
    ${props.tracks}
  </ol>
</details>
<hr/>
  `;
}

module.exports = { template };
