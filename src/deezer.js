const util = require('util');
const exec = util.promisify(require('child_process').exec);

const file = require('fs');
const path = require('path');

const { API } = require('./service/api');
const { template } = require('./view/template')

const fetchDeezerPlaylist = async () => {
  const { data: { tracks: { data } } } = await API.get();

  const songs =
    data.map((song) => {
      return {
        dzTitle: song.title,
        dzLink: song.link,
        dzDuration: song.duration
      }
    }, []);

  return songs;
};

const formattingSongs = async (songs) => {
  const path_repository = path.resolve(__dirname, '..', 'git_repo');
  const tracks = songs
    .map(
      (song) =>
        `<li><a href=${song.dzLink}>${(song.dzDuration / 60).toFixed(2)} min ● ${song.dzTitle}</a></li>`
    )
    .join("\n");

  const totalPlaylistTime = songs.reduce((acc, song) => {
    return acc + (song.dzDuration / 60)
  }, 0).toFixed(2)
  
  const { stdout: uptime, stderr: uptimeErr } = await exec('uptime -p');
  const { stdout: os, stderr: osErr } = await exec('hostnamectl | grep System');
  const { stdout: lastCommit, stderr: commitErr } = await exec(`cd ${path_repository} && git show -s --format=%ci HEAD`);
  const { stdout: shell, stderr: shellErr } = await exec("basename $SHELL");
  const { stdout: kernelVersion, stderr: kernelVersionErr } = await exec("uname -r | cut -d '-' -f1");
  const { stdout: usedMem, stderr: usedMemErr } = await exec("free -mh | awk '/^Mem/ {print $3}'");
  
  if (uptimeErr || osErr || commitErr || shellErr || kernelVersionErr || usedMemErr) {
    await exec(`notify-send -a 'Error' 'Error to get shell informations'`);

    throw new Error("Error to get shell informations");
  }; 

  const [osName] = os.match(/([^:])*$/);
  const [lastCommitDate, lastCommitTime] = lastCommit.split(' ');

  const layout = template({
    tracks,
    uptime,
    osName,
    lastCommitDate,
    lastCommitTime,
    shell,
    kernelVersion,
    totalPlaylistTime,
    usedMem
  });

  return layout;
}

async function writeSongToFile(data) {
  const readmePath = path.resolve(__dirname, '..', 'git_repo', 'readme.md');

  try {
    const htmlTemplate = await formattingSongs(data);
    file.writeFileSync(readmePath, htmlTemplate, {
      encoding: "utf-8",
    });
  } catch (error) {
    await exec(`notify-send -a 'Error: ' ${error.message}`);
    throw new Error(error.message);
  }
}

(async () => {
  const data = await fetchDeezerPlaylist();

  if (!data[0]) throw new Error('Error in fetch deezer service');

  writeSongToFile(data);
})();
