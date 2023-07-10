from datetime import datetime, timedelta, timezone

from lib.ddb import Ddb
from lib.db import db
# from lib.momento import MomentoCounter

class MessageGroups:
  def run(app,cognito_user_id):
    model = {
      'errors': None,
      'data': None
    }

    sql = db.template('users','uuid_from_handle')
    my_user_uuid = db.query_value(sql,{'cognito_user_id': cognito_user_id})
    app.logger.debug("PROVAAAAAA")
    app.logger.debug(my_user_uuid)
    print(f"UUID: {my_user_uuid}")

    ddb = Ddb.client(app)
    data = Ddb.list_message_groups(app,ddb, my_user_uuid)
    print("list_message_groups")
    print(data)

    #MomentoCounter.reset(f"msgs/{user_handle}")
    model['data'] = data
    return model