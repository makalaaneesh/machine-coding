
from enum import Enum

class LogLevel(Enum):
	INFO = 1
	WARN = 2
	ERROR = 3

class LogText:
	"""
	Actual text that has to be output
	"""
	pass

class LogOutput:
	"""
	The destination of the log text
	"""
	def write(log_text):
		pass

class FileOutput(Output):
	pass

class ElasticSearchOutput(Output):
	pass

class LogOutputFactory:
	@staticmethod
	def get_output(output_text):
		# switch case to return appropriate output
		pass


class LogConfig:
	"""
	Encapsulation of Log Level, Output.
	"""
	def __init__(self, log_level, output):
		self.log_level = log_level
		self.output = output


# TODO: Use Singleton pattern and 
class Logger:
	"""
	Main class that will expose config, logging methods.
	"""
	def __init__(self, log_configs):
		self.log_configs = log_configs

	def _can_output_for_config(log_level, log_config):
		# check if log_level is >= log_config.log_level

	def _log(log_level, text):
		# Iterate through all the configs
		#	Check if can output for config
		# 	if yes, call output.write(text)
		pass

	def info(text):
		# call _log with log_level
		pass

	def warn(text):
		# call _log with log_level
		pass

	def error(text):
		# call _log with log_level
		pass

