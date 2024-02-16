// Fetching data from the API
fetch('https://mocki.io/v1/ddb7e0a8-e218-4e36-b1be-b902cdb1c098')
  .then((response) => response.json())
  .then((data) => {
    // Extracting the admins and members arrays from the data
    const admins = data.filter((item) => item.role === 'admin');
    const members = data.filter((item) => item.role === 'member');

    // Displaying the admins
    const adminList = document.getElementById('team-admins-list');
    adminList.innerHTML = '';
    admins.forEach((admin) => {
      const listItem = createListItem(admin);
      adminList.appendChild(listItem);
    });

    // Displaying the members
    const membersList = document.getElementById('team-members-list');
    membersList.innerHTML = '';
    members.forEach((member) => {
      const listItem = createListItem(member);
      membersList.appendChild(listItem);
    });

    // Search functionality
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchInput = event.target
        .querySelector('input[type="search"]')
        .value.toLowerCase();
      const filteredAdmins = admins.filter((admin) => {
        const fullName = `${admin.first_name} ${admin.last_name}`.toLowerCase();
        return fullName.includes(searchInput);
      });
      const filteredMembers = members.filter((member) => {
        const fullName =
          `${member.first_name} ${member.last_name}`.toLowerCase();
        return fullName.includes(searchInput);
      });
      displaySearchResults(filteredAdmins, filteredMembers);
    });
  })
  .catch((error) => console.error('Error fetching data:', error));

function createListItem(member) {
  const listItem = document.createElement('div');
  listItem.innerHTML = `
    <div class="info">
      <img class="image" src="${member.img}" alt="${member.first_name} ${member.last_name}'s photo">
      <div>
        <p class="name">${member.first_name} ${member.last_name}</p>
        <p class="email">${member.email}</p>
      </div>
    </div>
  `;
  return listItem;
}

function displaySearchResults(filteredAdmins, filteredMembers) {
  const adminList = document.getElementById('team-admins-list');
  const membersList = document.getElementById('team-members-list');

  adminList.innerHTML = '';
  membersList.innerHTML = '';

  filteredAdmins.forEach((admin) => {
    const listItem = createListItem(admin);
    adminList.appendChild(listItem);
  });

  filteredMembers.forEach((member) => {
    const listItem = createListItem(member);
    membersList.appendChild(listItem);
  });
}
