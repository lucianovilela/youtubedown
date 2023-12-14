
import './App.css';
import React from 'react'

function humanizarTamanhoArquivo(bytes) {
  const unidades = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  if (isNaN(bytes)) return 'indefinido'
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + unidades[i];
}

const ShowInfo = ({ formInfo }) => {
  return (
    <div>
      <div class="text-center">
        {formInfo.info && formInfo.info.videoDetails.title}
      </div>
      {
        formInfo.info && formInfo.info.formats.map(item => (

          <div className="row">
            <div class="col">
              <a href={`/api/download?format=${item.itag}&start=${formInfo.start}&end=${formInfo.end}&url=${formInfo.info.videoDetails.video_url}`}  >{item.container} {item.quality} {item.qualityLabel}</a>
            </div>
            <div class="col">
              {item.hasAudio && <span className="material-symbols-outlined">
                music_note
              </span>}
              {item.hasVideo && <span className="material-symbols-outlined">
                slideshow
              </span>}
            </div>
            <div class="col">
              <span>{humanizarTamanhoArquivo(item.contentLength)}</span>
            </div>
          </div>
        )
        )}
    </div>
  )

}

const FormYoutube = (props) => {
  const INITIAL_STATE = { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", info: null, start: "00:00", end: "00:00" };
  const [formInfo, setFormInfo] = React.useState(INITIAL_STATE);
  const handleForm = () => {
    fetch(`/api/getInfo?url=${formInfo.url}`)
      .then(r => r.json())
      .then(r => setFormInfo({ ...formInfo, info: r }))
  }
  return (
    <div>

      <form>
        <div className="mb-3 mt-5">
          <label for="urlYoutube" className="form-label">URL</label>
          <input type="url" className="form-control" id="urlYoutube"
            value={formInfo.url}
            onChange={(event) => { setFormInfo({ ...formInfo, url: event.target.value }) }} />
          {/*

            <label for="start" className="form-label">Start</label>
          <input type="number" className="form-control" id="start" min="0"
          onChange={(event) => { setFormInfo({ ...formInfo, start: event.target.value }) }}
          value={formInfo.start} />
          <label for="end" className="form-label">End</label>
          <input type="number" className="form-control" id="end"
          onChange={(event) => { setFormInfo({ ...formInfo, end: event.target.value }) }}
          value={formInfo.end} />
          */
        }
        </div>
        <div className="mb-3">
          <button type="button" class="btn btn-primary" onClick={handleForm}>Consulta</button>
          <button type="reset" class="btn btn-danger ml-3" onClick={() => setFormInfo(INITIAL_STATE)} >Reset</button>
        </div>
        <div className="row">
          <div className="mb-5 col">
            <ShowInfo formInfo={formInfo} />
          </div>

        </div>
      </form>
    </div>
  );
}
class App extends React.Component {

  render() {
    return (
      <div className="container">

        <FormYoutube />

      </div>

    );
  }
}
export default App;
