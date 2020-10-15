export const TeachersList = (teachers) => {

  let output = `

    <section class="admin-teachers-list">
      <h1>Omies:</h1>
      <div>
        <table class="table table-hover table-condensed">
          <thead class="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Address</th>
              <th>Image</th>
              <th>Styles</th>
              <th>Levels</th>
              <th>Practices</th>
              <th>Coordinates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  `;

  for (let t of teachers) {
    const practices = t.practices.map(p => {
      return `<a href="/classes/${p._id}" data-link>${p.name}</a>`;
    })

    output += `
            <tr>
              <td>${t.name}</td>
              <td>${t.description}</td>
              <td>${t.address}</td>
              <td><img src="img/teachers/${t.tag}.jpg" /></td>
              <td>${t.styles}</td>
              <td>${t.levels}</td>
              <td>${practices}</td>
              <td>${t.coordinates}</td>
              <td>
                <a href="/teachers/${t._id}" class="btn btn-sm btn-outline-info" data-link>view</a> |
                <a href="/dashboard/teachers/${t._id}" class="btn btn-sm btn-outline-info" data-link>edit</a> |
                <a href="/dashboard/teachers/${t._id}" class="btn btn-sm btn-outline-info delete-teacher" data-id="${t._id}" data-link>delete</a>
              </td>
            </tr>
    `;
  }
  output += `
            </tbody>
          </table>
          <a href="/dashboard/teachers/create" class="btn btn-sm btn-outline-info" data-link>New Teacher</a>
        </div>
      </section>
  `;
  return output;
}
