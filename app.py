from flask import Flask, request, jsonify, send_file,send_from_directory, render_template
from flask_cors import CORS
import yt_dlp
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
filesize = 0


@app.route('/download', methods=['POST'])
def download_video():
    global filesize
    video_url = request.json.get('video_url')
    print(video_url)

    # Download the video using yt_dlp
    ydl_opts = {
        'outtmpl': 'downloads/%(title)s.%(ext)s',
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_url, download=True)
        video_path = ydl.prepare_filename(info)
        print(f"Video Path: {video_path}")
        print(os.path.exists(video_path))

    vp = os.path.join( os.getcwd(), "downloads")
    # Get the video file name
    video_filename = os.path.basename(video_path)
    print(f"video filename: {video_filename}")

    size = os.path.getsize(video_path)
    filesize = size

    # return send_from_directory('downloads', video_filename, as_attachment=True, mimetype='video/mp4')

    return jsonify({'video_path': f"{video_path}", "file_size": f"{filesize}"})
    # # return send_from_directory('/downloads', fname)
    # # return send_from_directory(f'JVD3\\downloads\\', video_filename, as_attachment=True, mimetype='video/mp4')
    #
    # # Set the appropriate content type header and send the file
    # # return send_file(video_path, as_attachment=True, mimetype='video/mp4', download_name=video_filename)



@app.route('/downloader/<path:filename>')
def download_file(filename):

    fname, file_size = str(filename).split(":::")
    print(f"==========================================")
    print(fname)
    print(file_size)
    print(f"==========================================")
    # file_size = os.path.getsize(path)


    # response = send_from_directory('downloads', fname,as_attachment=True, mimetype='video/mp4')
    # response.headers['Content-Length'] = file_size

    # return response
    return send_from_directory('downloads', fname,as_attachment=True, mimetype='video/mp4')


# @app.route('/home', methods=['GET'])
# def home():
#     return render_template('index.html')
#

if __name__ == '__main__':
    os.makedirs('downloads', exist_ok=True)
    app.run(debug=True)
