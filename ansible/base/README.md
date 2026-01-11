Base Role
=========

This role configures a fresh Ubuntu server with essential tools and Docker environment for running containerized applications.

Requirements
------------

- Ubuntu server (18.04 or later)
- SSH access with sudo privileges
- Python 3 installed on target server

What This Role Does
--------------------

1. Updates and upgrades system packages
2. Installs essential utilities (vim, git, curl, ca-certificates)
3. Installs Docker and Docker Compose
4. Adds the ubuntu user to the docker group
5. Ensures Docker service is running and enabled on boot

Role Variables
--------------

No custom variables required. The role uses default package names and configurations suitable for Ubuntu systems.

Dependencies
------------

None

Example Playbook
----------------

```yaml
---
- name: Configure web server
  hosts: webservers
  become: yes
  
  roles:
    - { role: base, tags: ['base'] }
```

Usage
-----

Run the playbook:
```bash
ansible-playbook -i inventory.ini setup.yml
```

Run only the base role:
```bash
ansible-playbook -i inventory.ini setup.yml --tags base
```

Post-Installation
-----------------

After running this role:
- Docker and Docker Compose will be available
- The ubuntu user can run docker commands without sudo
- The server is ready for container deployment

License
-------

MIT

Author Information
------------------

Created for Multi-Container Application deployment on AWS EC2.
