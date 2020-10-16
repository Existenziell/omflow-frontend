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
    output += `
            <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.location}</td>
              <td>${moment(user.createdAt).fromNow()}</td>
              <td>${moment(user.lastLogin).fromNow()}</td>
              <td>
                <a href="/users/${user._id}" class="btn btn-sm btn-outline-info" data-link>view</a> |
                <a href="/dashboard/users/${user._id}" class="btn btn-sm btn-outline-info" data-link>edit</a> |
                <a href="/dashboard/users/${user._id}" class="btn btn-sm btn-outline-info delete-teacher" data-id="${user._id}" data-link>delete</a>
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
