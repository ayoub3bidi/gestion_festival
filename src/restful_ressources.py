
import os
from routes import health
import middleware.auth_guard as auth_guard
from routes.user import user, room, show_type, show
from routes.admin import user as admin_user
from routes.admin import room as admin_room
from routes.admin import show_type as admin_show_type
from routes.admin import show as admin_show
from constants.environment_variables import v

def import_resources(app):
    app.include_router(health.router, tags=['Information'], prefix=f'/{v}')
    app.include_router(auth_guard.router, tags=['Access Token'], prefix=f'/{v}')
    app.include_router(admin_user.router, tags=['Admin'], prefix=f'/{v}/admin/user')
    app.include_router(user.router, tags=['User'], prefix=f'/{v}/user')
    app.include_router(room.router, tags=['Room'], prefix=f'/{v}/room')
    app.include_router(show_type.router, tags=['Show Type'], prefix=f'/{v}/show-type')
    app.include_router(show.router, tags=['Show'], prefix=f'/{v}/show')
    #? Admin routes
    app.include_router(admin_room.router, tags=['Room Administration'], prefix=f'/{v}/admin/room')
    app.include_router(admin_show_type.router, tags=['Show Type Administration'], prefix=f'/{v}/admin/show-type')
    app.include_router(admin_show.router, tags=['Show Administration'], prefix=f'/{v}/admin/show')