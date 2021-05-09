git -C /home/rwietter/deezer_load_songs/ add -A
git -C /home/rwietter/deezer_load_songs/ commit -m "update repo"
git -C /home/rwietter/deezer_load_songs/ push origin main -f

notify-send -a 'github' 'updated template and push to github'
