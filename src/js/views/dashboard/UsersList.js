export const UsersList = (users) => {

  let output = `
    <section class="admin-users-list">

      <div class="table-header">
        <h2>All Users</h2>
      </div>

      <table class="table table-hover table-condensed">
        <thead class="thead-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Registered since</th>
            <th>Last Login</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  `;

  for (let user of users.data) {
    const { name, email, location, createdAt, lastLogin, role, _id } = user;

    output += `
          <tr>
            <td>${name}</td>
            <td>${email}</td>
            <td>${location}</td>
            <td>${moment(createdAt).fromNow()}</td>
            <td>${moment(lastLogin).fromNow()}</td>
            <td>${role.name}</td>
            <td>
              <a href="/dashboard/users/promote/${_id}" class="btn btn-sm btn-outline-info" data-link>Promote!</a> |
              <a href="/dashboard/users/${_id}" class="btn btn-sm btn-outline-info" data-link>edit</a> |
              <a href="/dashboard/users/${_id}" class="btn btn-sm btn-outline-info delete-user" data-id="${_id}">delete</a>
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
