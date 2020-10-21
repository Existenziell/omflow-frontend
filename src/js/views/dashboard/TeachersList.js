export const TeachersList = (teachers) => {

  let output = `
    <section class="admin-teachers-list">

      <div class="table-header">
        <h2>All Teachers</h2>
        <a href="/dashboard/teacher/create" class="btn btn-sm btn-outline-info" data-link>Create Teacher</a>
      </div>

      <table class="table table-hover table-condensed">
        <thead class="thead-light">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Image</th>
            <th>Styles</th>
            <th>Levels</th>
            <th>#Practices</th>
            <th>Coordinates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  `;

  for (let t of teachers) {
    // ToDo: (Do we need a list of all teacher practices?)
    // const practices = t.practices.map(p => {
    //   return `<a href="/classes/${p._id}" data-link>${p.level} ${p.style}</a>`;
    // })
    output += `
          <tr>
            <td>${t.name}</td>
            <td>${t.description}</td>
            <td>${t.address}</td>
            <td><img src="${process.env.API_URL}/${t.image}" alt="${t.tag}" /></td>
            <td>
            ${t.styles.map((item) => ` ${item.identifier}`)}
            </td>
            <td>
            ${t.levels.map((item) => ` ${item.identifier}`)}
            </td>
            <td>${t.practices.length}</td>
            <td>${t.coordinates}</td>
            <td>
              <a href="/teachers/${t._id}" class="btn btn-sm btn-outline-info" data-link>view</a> |
              <a href="/dashboard/teacher/${t._id}" class="btn btn-sm btn-outline-info" data-link>edit</a>
            </td>
          </tr>
    `;
  }
  output += `
          </tbody>
        </table>
      </section>
  `;
  return output;
}
