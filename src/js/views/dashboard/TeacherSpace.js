import { ClassesList } from "./ClassesList.js";

export const TeacherSpace = async (data, role) => {

  const {
    _id, name, description, address, coordinates, tag,
    image, video, practices, pose, instagram, createdAt, quote
  } = data.teacher;

  return `
    <section class='teacher-space'>
      <h2>Welcome to your personal space ${name}</h2>
      <p>Here you can edit your information.</p>
      <form id="edit-teacher" action="${process.env.API_URL}/teachers/edit/${_id}" method="POST">
        <div class="form-group">
          <label>Name:</label>
          <input type="text" required class="form-control teacher-name" value="${name}" />
        </div>
        <div class="form-group">
          <label>Address/Location:</label>
          <input type="text" class="form-control teacher-address" value="${address}" />
        </div>
        <div class="form-group">
          <label>Coordinates</label>
          <input type="text" class="form-control teacher-coordinates" value="${coordinates}" disabled />
        </div>
        <div class="form-group">
          <label>Description/Bio:</label>
          <input type="text" required class="form-control teacher-description" value="${description}" />
        </div>
        <div class="form-group">
          <label>Quote/Testimonal:</label>
          <input type="text" required class="form-control teacher-quote" value="${quote}" />
        </div>
        <div class="form-group">
          <label>Instagram:</label>
          <input type="text" required class="form-control teacher-instagram" value="${instagram}" />
        </div>
        <div class="form-group">
          <label>Preferred Pose:</label>
          <input type="text" required class="form-control teacher-pose" value="${pose}" />
        </div>
        <div class="form-group">
          <label>Image:</label>
          <input type="text" required class="form-control teacher-image" value="${image}" disabled />
        </div>
        <div class="form-group">
          <label>Video:</label>
          <input type="text" required class="form-control teacher-video" value="${video}" disabled />
        </div>
        <div class="form-group">
          <label>tag:</label>
          <input type="text" required class="form-control teacher-tag" value="${tag}" disabled />
        </div>
        <div class="form-group">
          <label>Omflower since:</label>
          <input type="text" required class="form-control teacher-createdAt" value="${moment(createdAt).fromNow()}" disabled />
        </div>
        <div class="form-group">
          <label>Omflow ID:</label>
          <input type="text" class="form-control teacher-id" value="${_id}" disabled />
        </div>
        <div class="form-group">
          <label>Associated site user:</label>
          <input type="text" class="form-control teacher-user" value="${data.name} / ${data.email} / ${data.id}" disabled />
        </div>
        <div class="form-group">
          <p class="server-msg"></p>
          <a href="" id="save-teacher" class="btn btn-sm btn-outline-info">Save</a>
        </div>
      </form>
    </section>
    ${ClassesList(practices, role)
    }
`;
}
