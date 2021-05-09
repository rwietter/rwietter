git -C /home/rwietter/deezer_load_songs/git_repo add -A
git -C /home/rwietter/deezer_load_songs/git_repo commit -m "update repo"
git -C /home/rwietter/deezer_load_songs/git_repo push origin main -f

notify-send -a 'github' 'updated template and push to github'
