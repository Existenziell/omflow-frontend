export const ClassesList = (practices, role) => {
  if (practices === undefined || practices.length == 0) {
    return `
      <a href="/dashboard/classes/create" class="btn btn-sm btn-outline-info" data-link>New Class</a>
    `;
  }

  let output = `
      <section class="admin-practices-list">
        <h2>${role === 'admin' ? 'All classes' : 'My classes'}</h2>
        <table class="table table-hover table-condensed">
          <thead class="thead-light">
            <tr>
              <th>Style</th>
              <th>Level</th>
              ${role === 'admin' ? `<th>Teacher</th>` : ''}
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
    `;
  for (let p of practices) {
    output += `
            <tr>
              <td>${p.style.identifier}</td>
              <td>${p.level.identifier}</td>
              ${role === 'admin' ? `<td>${p.teacher.name}</td>` : ''}
              <td>${p.name}</td>
              <td class="practicelist-description">${p.description}</td>
              <td>${p.duration}</td>
              <td>${moment(p.date).format("MMMM Do YYYY, h:mm a")}</td>
              <td>
                <a href="/classes/${p._id}" class="btn btn-sm btn-outline-info" data-link>view</a> |
                <a href="/dashboard/classes/${p._id}" class="btn btn-sm btn-outline-info" data-link>edit</a> |
                <a href="" class="btn btn-sm btn-outline-info delete-practice" data-id="${p._id}">delete</a>
              </td>
            </tr>
      `;
  }
  output += `
            </tbody>
          </table>
          <a href="/dashboard/classes/create" class="btn btn-sm btn-outline-info" data-link>New Class</a>
        </section>
      `;
  return output;
}
