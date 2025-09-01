"""
Key changes:
- Install PyMySQL as MySQLdb for MySQL DATABASE_URL compatibility.
"""

try:
    import pymysql  # type: ignore

    pymysql.install_as_MySQLdb()
except Exception:
    # PyMySQL not strictly required unless using MySQL
    pass
