export const ClassesList = (practices) => {

  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  let output = `
      <div>
        <table class="table table-hover table-condensed">
          <thead class="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Teacher</th>
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
              <td>${p.name}</td>
              <td class="practice-description">${p.description}</td>
              <td>${p.teacher.name}</td>
              <td>${p.duration}</td>
              <td>${new Date(p.date).toLocaleDateString("en-US", options)}</td>
              <td>
                <a href="/classes/${p._id}" class="btn btn-sm btn-outline-info" data-link>view</a> |
                <a href="/dashboard/classes/${p._id}" class="btn btn-sm btn-outline-info" data-link>edit</a> |
                <a href="" class="btn btn-sm btn-outline-info delete-practice" data-id="${p._id}" data-link>delete</a>
              </td>
            </tr>
      `;
  }
  output += `
            </tbody>
          </table>
          <a href="/dashboard/classes/create" class="btn btn-sm btn-outline-info" data-link>Create Class</a>
        </div>
      `;
  return output;
}
