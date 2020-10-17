export const UsersList = (users) => {

  let output = `
    <section class="admin-users-list">
      <h2>All users:</h2>
      <div>
        <table class="table table-hover table-condensed">
          <thead class="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Registered since</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  `;

  for (let user of users.data) {
    const { name, email, location, createdAt, lastLogin, _id } = user;

    output += `
            <tr>
              <td>${name}</td>
              <td>${email}</td>
              <td>${location}</td>
              <td>${moment(createdAt).fromNow()}</td>
              <td>${moment(lastLogin).fromNow()}</td>
              <td>
                <a href="/users/${_id}" class="btn btn-sm btn-outline-info" data-link>view</a> |
                <a href="/dashboard/users/${_id}" class="btn btn-sm btn-outline-info" data-link>edit</a> |
                <a href="/dashboard/users/${_id}" class="btn btn-sm btn-outline-info delete-teacher" data-id="${_id}" data-link>delete</a>
              </td>
            </tr>
    `;
  }

  output += `
            </tbody>
          </table>
        </div>
      </section>
  `;
  return output;
}
