# Generated by Django 2.1.4 on 2018-12-16 05:38

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(default='text', max_length=50)),
                ('title', models.CharField(max_length=255)),
                ('intro', models.TextField()),
                ('video', models.TextField()),
                ('cover', models.CharField(blank=True, max_length=255, null=True)),
                ('state', models.CharField(choices=[('public', 'public'), ('personal', 'personal'), ('draft', 'draft'), ('closed', 'closed')], default='draft', max_length=20)),
                ('created_at', models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True)),
                ('updated_at', models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='NodeAttribute',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('value', models.TextField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'db_table': 'moon_node_attribute',
            },
        ),
        migrations.CreateModel(
            name='NodeRevision',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'db_table': 'moon_node_revision',
            },
        ),
        migrations.CreateModel(
            name='NodeTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'moon_node_tag',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=100)),
                ('username', models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(4)])),
                ('password', models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(6)])),
                ('role', models.CharField(choices=[('admin', 'admin'), ('editor', 'editor'), ('general', 'general'), ('closed', 'closed')], default='general', max_length=20)),
                ('logined_at', models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['email'], name='moon_user_email_a6e5ab_idx'),
        ),
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['username'], name='moon_user_usernam_697c1b_idx'),
        ),
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['role'], name='moon_user_role_e2234f_idx'),
        ),
        migrations.AddField(
            model_name='tag',
            name='nodes',
            field=models.ManyToManyField(through='moon.NodeTag', to='moon.Node'),
        ),
        migrations.AddField(
            model_name='tag',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='moon.Tag'),
        ),
        migrations.AddField(
            model_name='nodetag',
            name='node',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='moon.Node'),
        ),
        migrations.AddField(
            model_name='nodetag',
            name='tag',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='moon.Tag'),
        ),
        migrations.AddField(
            model_name='noderevision',
            name='node',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='revisions', to='moon.Node'),
        ),
        migrations.AddField(
            model_name='nodeattribute',
            name='node',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attributes', to='moon.Node'),
        ),
        migrations.AddField(
            model_name='node',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='moon.Node'),
        ),
        migrations.AddField(
            model_name='node',
            name='revision',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='latest_version', to='moon.NodeRevision'),
        ),
        migrations.AddField(
            model_name='node',
            name='tags',
            field=models.ManyToManyField(through='moon.NodeTag', to='moon.Tag'),
        ),
        migrations.AddField(
            model_name='node',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='nodes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddIndex(
            model_name='tag',
            index=models.Index(fields=['name'], name='moon_tag_name_1bc7ed_idx'),
        ),
        migrations.AddIndex(
            model_name='tag',
            index=models.Index(fields=['parent'], name='moon_tag_parent__3e45c1_idx'),
        ),
        migrations.AddIndex(
            model_name='nodetag',
            index=models.Index(fields=['node'], name='moon_node_t_node_id_5080e0_idx'),
        ),
        migrations.AddIndex(
            model_name='nodetag',
            index=models.Index(fields=['tag'], name='moon_node_t_tag_id_b33567_idx'),
        ),
        migrations.AddIndex(
            model_name='noderevision',
            index=models.Index(fields=['node'], name='moon_node_r_node_id_8a4f82_idx'),
        ),
        migrations.AddIndex(
            model_name='nodeattribute',
            index=models.Index(fields=['node'], name='moon_node_a_node_id_c0a39c_idx'),
        ),
        migrations.AddIndex(
            model_name='node',
            index=models.Index(fields=['user'], name='moon_node_user_id_8f69fd_idx'),
        ),
        migrations.AddIndex(
            model_name='node',
            index=models.Index(fields=['type'], name='moon_node_type_ecf8b0_idx'),
        ),
        migrations.AddIndex(
            model_name='node',
            index=models.Index(fields=['parent'], name='moon_node_parent__f2e9f8_idx'),
        ),
        migrations.AddIndex(
            model_name='node',
            index=models.Index(fields=['revision'], name='moon_node_revisio_f561ae_idx'),
        ),
        migrations.AddIndex(
            model_name='node',
            index=models.Index(fields=['state'], name='moon_node_state_561369_idx'),
        ),
    ]
